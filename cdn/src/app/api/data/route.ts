import data from '@/services/data.json';

export async function GET() {
  // 设置响应头允许跨域访问
  return new Response(
    JSON.stringify({
      code: 200,
      data,
      msg: 'success'
    }),
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
      }
    }
  );
}
