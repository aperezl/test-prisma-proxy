
export const resolvers = {
  Query: {
    links: async (_, __, ctx) => {
      return await ctx.prisma.link.findMany()
    }
  }
}