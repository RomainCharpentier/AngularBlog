import { createModel, Mapping, Model } from './model';

export interface RawPost {
    id: number;
    title: string;
    content: string;
    like: number;
}

class PostMapping extends Mapping<RawPost> {
    id = 0;
    title = '';
    content = '';
    like = 0;
}

export interface Post extends Model<PostMapping> { }

export const Post = createModel<Post>(PostMapping);
