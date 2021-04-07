/**
 * Application feature reduced to Input and Output, where Input are the params
 * this feature requires and the Output the result from executing such task.
 * 
 * The domain related logic is encapsulated by the Use Case and a single function
 * "execute", is exposed which will take the params, will make sure they are valid,
 * then the pertinent logic from the domain layer is exucted and retieves a result
 * (Output).
 */
export default interface UseCase<Input, Output> {
  execute(input?: Input): Output | Promise<Output>;
}
