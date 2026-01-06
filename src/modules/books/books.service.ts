import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DRIZZLE_DB } from 'src/core/database/db.module';
import type { DrizzleDB } from 'src/common/types/drizzle';
import { checkUserDatas } from 'src/common/functions/chechUser';
import { book } from 'src/core/database/schema/book.schema';

@Injectable()
export class BooksService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDB, private readonly checkUser: checkUserDatas) { }

  async createBook(bookData: CreateBookDto, ownerId: string) {
    try {
      const usersData = await this.checkUser.checkUserExists(ownerId)

      bookData['ownerId'] = ownerId

      // @ts-ignore
      const createBook = (await this.db.insert(book).values(bookData).returning())

      return {
        message: 'success',
        code: 201,
        data: { ...createBook }
      }
    } catch (error) {
      console.log(error);
    }
  }

}
