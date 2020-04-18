import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import SearchResolver from './resolvers/Search';
import Search, { resolveSearchReference } from './entities/Search';

(async (): Promise<void> => {
  const schema = await buildFederatedSchema(
    {
      resolvers: [SearchResolver],
      orphanedTypes: [Search],
    },
    {
      User: { __resolveReference: resolveSearchReference },
    }
  );

  const server = new ApolloServer({
    schema,
    tracing: false,
    playground: true,
  });

  const { url } = await server.listen({ port: 5004 });
  console.log(`Search service listening on ${url}`);
})();
