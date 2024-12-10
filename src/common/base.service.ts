import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { DuplicateEntryException } from './exceptions/duplicate-entry.exception';
import { ForeignKeyNotFoundException } from './exceptions/foreign-key-not-found.exception';

@Injectable()
export abstract class BaseService<T> {
  constructor(
    protected readonly repository: Repository<T>,
    private readonly entityName: string,
  ) {}

  protected async executeOperation<R>(operation: () => Promise<R>): Promise<R> {
    try {
      return await operation();
    } catch (error) {
      this.handleError(error);
    }
  }

  protected async findOneOrFail(
    id: number,
    options?: FindOneOptions<T>,
  ): Promise<T> {
    try {
      const entity = await this.repository.findOne({
        where: { id } as any,
        ...options,
      });
      if (!entity) {
        throw new NotFoundException(
          `${this.entityName} with ID ${id} not found`,
        );
      }
      return entity;
    } catch (error) {
      this.handleError(error);
    }
  }

  protected async saveEntity(entity: Partial<T>): Promise<T> {
    try {
      return await this.repository.save(entity as any);
    } catch (error) {
      this.handleError(error);
    }
  }

  protected async updateEntity(id: number, updateData: Partial<T>): Promise<T> {
    try {
      await this.repository.update(id, updateData as any);
      return await this.findOneOrFail(id);
    } catch (error) {
      this.handleError(error);
    }
  }

  protected async removeEntity(id: number): Promise<T> {
    try {
      const entity = await this.findOneOrFail(id);
      return await this.repository.remove(entity);
    } catch (error) {
      this.handleError(error);
    }
  }

  protected async checkDuplicate(field: string, value: any): Promise<void> {
    const exists = await this.repository.findOne({
      where: { [field]: value } as any,
    });
    if (exists) {
      throw new DuplicateEntryException(field);
    }
  }

  private handleError(error: any): never {
    // Handle unique constraint violations
    if (error.code === '23505') {
      const field = this.extractFieldFromError(error);
      throw new DuplicateEntryException(field);
    }

    // Handle foreign key violations
    if (error.code === '23503') {
      const field = this.extractFieldFromError(error);
      const match = error.detail?.match(/\((.*?)\)=\((.*?)\)/);
      const value = match ? match[2] : 'unknown';
      throw new ForeignKeyNotFoundException(field, parseInt(value));
    }

    // Pass through NotFoundException
    if (error instanceof NotFoundException) {
      throw error;
    }

    // Default error
    throw new InternalServerErrorException(
      `Error processing ${this.entityName.toLowerCase()} operation`,
    );
  }

  private extractFieldFromError(error: any): string {
    const match = error.detail?.match(/Key \((.*?)\)=/);
    return match ? match[1] : 'field';
  }
}
