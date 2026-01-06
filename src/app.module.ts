import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';
import { PostsModule } from './modules/posts/posts.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [UsersModule, AuthModule, CoreModule, PostsModule, BooksModule],
})
export class AppModule { }
