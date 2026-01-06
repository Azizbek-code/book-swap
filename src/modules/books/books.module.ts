import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { checkUserDatas } from 'src/common/functions/chechUser';

@Module({
  controllers: [BooksController],
  providers: [BooksService,checkUserDatas],
})
export class BooksModule {}
