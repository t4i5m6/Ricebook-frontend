import { Post } from './post';

describe('Post', () => {
  it('should create an instance', () => {
    expect(new Post("tim", "tim", 123, "555")).toBeTruthy();
  });
});
