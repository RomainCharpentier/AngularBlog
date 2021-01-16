import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Post } from '../shared/models/post.model';

localStorage.setItem('login', 'Romain');
localStorage.setItem('posts', '[]');
let user: string = localStorage.getItem('login') || '';
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
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function getPosts(): Observable<HttpResponse<Post[]>> {
            // if (!isLoggedIn()) {
            //     return unauthorized();
            // }
            return ok(posts);
        }

        function createPost(): Observable<HttpResponse<Post[]>> {
            const post: Post = body;
            post.id = posts.length ? Math.max(...posts.map(x => x.id)) + 1 : 1;
            post.author = user;
            post.like = 0;
            posts.push(post);
            localStorage.setItem('posts', JSON.stringify(posts));
            return ok();
        }

        // helper functions

        function ok(body?: Post[]): Observable<HttpResponse<Post[]>> {
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
