interface HttpResponse<T> extends Response {
  parsedBody?: T;
}
export default async function http<T>(input: RequestInfo, init?: RequestInit): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(input, init);
  response.parsedBody = await response.json();
  return response;
}
