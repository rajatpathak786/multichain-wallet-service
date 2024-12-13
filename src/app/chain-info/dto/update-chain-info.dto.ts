import { PartialType } from '@nestjs/mapped-types';
import { CreateChainInfoDto } from './create-chain-info.dto';

export class UpdateChainInfoDto extends PartialType(CreateChainInfoDto) {}
