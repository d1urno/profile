import type { APIRoute, GetStaticPaths } from 'astro'
import catalog from '../../../public/ai-catalog.json'

export const getStaticPaths = (() =>
  ['ard', 'ai-catalog'].map((catalog) => ({ params: { catalog } }))) satisfies GetStaticPaths

export const GET: APIRoute = () =>
  new Response(`${JSON.stringify(catalog, null, 2)}\n`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  })
