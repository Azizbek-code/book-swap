import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import type { DrizzleDB } from 'src/common/types/drizzle';
import { DRIZZLE_DB } from 'src/core/database/db.module';
import { posts } from 'src/core/database/schema/posts.schema';
import { users } from 'src/core/database/schema/user.schema';
import { createPostDto } from './dto/create-post-dto';
import { updatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostsService {
    constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDB) { }

    async createPost(data: createPostDto, id: string) {
        try {
            const createPost = (await this.db.insert(posts).values({ title: data.title, content: data.content, userId: id }).returning())

            return {
                message: 'success',
                httpCode: 201,
                data: { ...createPost }
            }
        } catch (error) {
            console.log(error);
        }
    }


    async getPosts() {
        const postWithUser = await this.db
            .select({
                postId: posts.id,
                title: posts.title,
                content: posts.content,
                userEmail: users.email,
                userName: users.full_name,
            })
            .from(posts)
            .innerJoin(users, eq(posts.userId, users.id))


        return {
            message: `you get posts successfully`,
            httpCode: 200,
            data: { ...postWithUser }
        }
    }

    async getOnePost(id: string) {
        const postWithUser = await this.db
            .select({
                postId: posts.id,
                title: posts.title,
                content: posts.content,
                userEmail: users.email,
                userName: users.full_name,
            })
            .from(posts)
            .innerJoin(users, eq(posts.userId, users.id))
            .where(eq(posts.id, id));

        return {
            message: `you get post successfully`,
            httpCode: 200,
            data: { ...postWithUser }
        }
    }

    async updatePost(updatedData: updatePostDto, postId: string,userId) {
        try {
            const findPost = (await this.db.select().from(posts).where(eq(posts.id, postId)).limit(1))[0] ?? null

            if (!findPost) throw new NotFoundException()

            const updateData = (await this.db.update(posts).set(updatedData).where(and(eq(posts.id, postId), eq(posts.userId, userId))).returning())

            return {
                message: `your post updated successfuly`,
                httpCode: 201,
                data: { ...updateData }
            }
        } catch (error) {
            console.log(error);

        }
    }

    async delPost(postId: string, user_id: string) {
        try {
            const findPostAndConfirm = (await this.db.select().from(posts).where(and(eq(posts.id, postId), eq(posts.userId, user_id))).limit(1))[0] ?? null

            if (!findPostAndConfirm) throw new NotFoundException()

            const deletedData = (await this.db.delete(posts).where(eq(posts.id, postId)).returning())

            return {
                message: 'your post deleted successfuly',
                httpCode: 201,
                deletedData: { ...deletedData }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
