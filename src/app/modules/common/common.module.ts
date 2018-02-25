import { Module } from '@nestjs/common';
import { commonProviders } from './common.providers';

@Module({
    components: [...commonProviders],
    exports: [...commonProviders],
})
export class CommonModule {}