import { Catch, ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcCustomExceptionFilter.name);
  catch(exception: RpcException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const rpcError = exception.getError();
    try {
      if (
        typeof rpcError === 'object' &&
        'status' in rpcError &&
        'message' in rpcError
      ) {
        response.status(rpcError.status).json({
          status: rpcError.status,
          message: rpcError.message,
        });
      }
    } catch (error) {
      this.logger.error(error);
      return response.status(400).json({
        status: 400,
        message: 'Bad Request',
      });
    }
  }
}
