import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { FileAccessor, FileService } from '../file.service';
import { New } from './entities/new.entity';

@Module({
  controllers: [NewsController],
  providers: [
    NewsService,
    {
      provide: FileService,
      useFactory: (news: NewsModule) =>
        new FileService<New[]>(news.filePath),
      inject: [NewsModule],
    },
  ],
})
export class NewsModule implements FileAccessor {
  public readonly filePath = 'assets/news.json';
}