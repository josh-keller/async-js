const iterable = {
  [Symbol.iterator]() {
    let done = false;

    const iterator = {
      [Symbol.iterator]() {
        return this;
      },

      next() {
        if (done) {
          return {
            value: undefined,
            done
          };
        }

        // Calculate value and done
        return {
          value,
          done
        }
      },

      return(value) {
        done = true;

        return {
          value,
          done;
        }
      },

      throw(e) {
        done = true

        throw e;
      }
    }

    return iterator;
  }
}
