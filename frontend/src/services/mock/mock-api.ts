const randomDelay = () => 250 + Math.round(Math.random() * 350);

export async function mockRequest<T>(data: T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, randomDelay()));
  return structuredClone(data);
}
