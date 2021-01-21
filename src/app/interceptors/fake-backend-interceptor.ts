import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Post } from '../shared/models/post.model';
import { User } from '../shared/models/user.model';

localStorage.setItem('user', '{}');
localStorage.setItem('posts', '[]');
localStorage.setItem('users', '[]');
let user: User = JSON.parse(localStorage.getItem('user') || '') || '';
let users: User[] = JSON.parse(localStorage.getItem('users') || '[]') || [];
let posts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]') || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute(): Observable<HttpEvent<any>> {
            switch (true) {
                case url.endsWith('/post') && method === 'GET':
                    return getPosts();
                case url.endsWith('/post') && method === 'PUT':
                    return createPost();
                case url.endsWith('/auth') && method === 'POST':
                    return getUser();
                case url.endsWith('/auth') && method === 'PUT':
                    return createUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function getPosts(): Observable<HttpResponse<Post[]>> {
            return ok(posts);
        }

        function createPost(): Observable<HttpResponse<Post[]>> {
            const post: Post = body;
            post.id = posts.length ? Math.max(...posts.map(x => x.id)) + 1 : 1;
            post.author = user.first_name + ' ' + user.last_name;
            post.like = 0;
            posts.push(post);
            localStorage.setItem('posts', JSON.stringify(posts));
            return ok();
        }

        function getUser(): Observable<HttpResponse<User>> {
            console.log(body);
            const email: string = body;
            const userFound: User = users.find(x => x.email === email) as User;
            console.log(users);
            console.log(userFound);
            if (userFound !== undefined) {
                user = userFound;
                localStorage.setItem('user', JSON.stringify(user));
                return ok(userFound);
            }
            return error('Utilisateur inexistant pour le mail : ' + email);
        }

        function createUser(): Observable<HttpResponse<User[]>> {
            const user: User = body;
            user.id = users.length ? Math.max(...posts.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?: any): Observable<HttpResponse<any>> {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}
