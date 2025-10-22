import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) { }

    @Post()
    create(@Body() createDto: CreateProfileDto) {
        return this.profilesService.create(createDto);
    }

    @Get()
    findAll() {
        return this.profilesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.profilesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateProfileDto) {
        return this.profilesService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.profilesService.remove(id);
    }
}
