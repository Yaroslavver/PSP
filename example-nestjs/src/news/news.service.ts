import { Injectable } from '@nestjs/common';
import { CreateNewDto } from './dto/create-new.dto';
import { UpdateNewDto } from './dto/update-new.dto';

import { New } from './entities/new.entity';
import { FileService } from '../file.service';

@Injectable()
export class NewsService {
  constructor(private fileService: FileService<New[]>) {}

  create(createNewDto: CreateNewDto) {
    const news = this.fileService.read();
    const new_ = { ...createNewDto, id: news.length + 1 };

    this.fileService.add(new_);
    
  }

  findAll(title?: string): New[] {
    const news = this.fileService.read();

    return title
      ? news.filter((new_) =>
          new_.title.toLowerCase().includes(title.toLowerCase()),
        )
      : news;
  }

  findOne(id: number): New | null {
    const news = this.fileService.read();

    return news.find((new_) => new_.id === id) ?? null;
  }

  update(id: number, updateNewDto: UpdateNewDto): void {
    const news = this.fileService.read();

    const updatedNews = news.map((new_) =>
      new_.id === id ? { ...new_, ...updateNewDto } : new_,
    );

    this.fileService.write(updatedNews);
  }

  remove(id: number): void {
    const filteredNews = this.fileService
      .read()
      .filter((new_) => new_.id !== id);

    this.fileService.write(filteredNews);
  }
}
