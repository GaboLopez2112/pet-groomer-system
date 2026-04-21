import { PartialType } from '@nestjs/swagger';
import { CreateGroomerDto } from './create-groomer.dto';

export class UpdateGroomerDto extends PartialType(CreateGroomerDto) {}
