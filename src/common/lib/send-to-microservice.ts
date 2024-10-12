import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

export const sendToMicroservice = <T>(
  client: ClientProxy,
  to: string,
  payload: T,
) =>
  client.send(to, payload).pipe(
    catchError((error) => {
      throw new RpcException(error);
    }),
  );
