import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { GetUserId } from 'src/common/decorators/get.user.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post('create')
  @UseGuards(JwtGuard)
  async createBook(@Body() bookData: CreateBookDto, @GetUserId() ownerId: string) {
    try {
      const newBookData = await this.booksService.createBook(bookData, ownerId)
      
      return newBookData
    } catch (error) {
      throw error
    }
   }
}
