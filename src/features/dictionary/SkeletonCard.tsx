import styles from "./SkeletonCard.module.css";

const { card, wordBar, audioBox, meaning, labelBar, definition, example, line } =
  styles;

export function SkeletonCard() {
  return (
    <div className={card}>
      <div className={wordBar}></div>
      <div className={audioBox}></div>
      <div className={meaning}>
        <div className={labelBar}></div>
        <div className={definition}>
          <div className={line}></div>
          <div className={line}></div>
          <div className={line}></div>
          <div className={line}></div>
        </div>
        <div className={example}>
          <div className={line}></div>
          <div className={line}></div>
          <div className={line}></div>
        </div>
      </div>
      <div className={meaning}>
        <div className={labelBar}></div>
        <div className={definition}>
          <div className={line}></div>
          <div className={line}></div>
          <div className={line}></div>
          <div className={line}></div>
        </div>
        <div className={example}>
          <div className={line}></div>
          <div className={line}></div>
          <div className={line}></div>
        </div>
      </div>
    </div>
  );
}
