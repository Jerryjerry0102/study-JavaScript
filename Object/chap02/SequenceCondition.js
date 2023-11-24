class SequenceCondition {
  #sequence; // 순번

  constructor(sequence) {
    this.#sequence = sequence;
  }

  isSatisfiedBy(screening) {
    return screening.isSequence(this.#sequence);
  }
}

export default SequenceCondition;
