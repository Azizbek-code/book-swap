import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GetUserId } from 'src/common/decorators/get.user.decorator';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { createPostDto } from './dto/create-post-dto';
import { PostsService } from './posts.service';
import { updatePostDto } from './dto/update-post-dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post('create')
  @UseGuards(JwtGuard)
  async createPost(@Body() data: createPostDto, @GetUserId() id: string) {
    try {
      const response = await this.postsService.createPost(data, id)
      return response
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/get')
  async getPosts() {
    try {
      const data = await this.postsService.getPosts()
      return data
    } catch (error) {
      console.log(error);

    }
  }

  @Get('/get/:id')
  async getOne(@Param('id') id: string) {
    try {
      const data = await this.postsService.getOnePost(id)
      return data
    } catch (error) {
      console.log(error);
    }
  }

  @Put('update/:id')
  @UseGuards(JwtGuard)
  async updateData(@GetUserId() userId:string,@Param('id') id:string,@Body() data : updatePostDto) {
    try {
      const updateData = await this.postsService.updatePost(data,id,userId)
    } catch (error) {
      console.log(error);
      
    }
  }

  @Delete('delete/:id')
  @UseGuards(JwtGuard)
  async deletedData(@GetUserId() userId:string,@Param('id') id:string) {
    try {
      const response = await this.postsService.delPost(id, userId)
      
      return response
    } catch (error) {
      console.log(error);
      
    }
  }

} 