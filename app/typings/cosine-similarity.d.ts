// typings/cosine-similarity.d.ts

declare module "cosine-similarity" {
  /**
   * Compute cosine similarity between two vectors.
   * @param a First vector
   * @param b Second vector
   * @returns similarity number between -1 and 1
   */
  function cosineSimilarity(a: number[], b: number[]): number;

  export = cosineSimilarity;
}
