export class Timer {
  private startTime: number = 0;
  private elapsedTime: number = 0;
  private setTimeId: number | null = null;

  private timer = document.getElementById('timer');
  constructor() {}

  public start() {
    if (this.setTimeId === null) {
      this.startTime = Date.now() - this.elapsedTime;
      this.setTimeId = window.setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;

        console.log(this.elapsedTime);
      }, 100);
    }
    return this.elapsedTime;
  }

  public pause = () => {
    if (this.setTimeId !== null) {
      clearInterval(this.setTimeId);
      this.setTimeId = null;
    }
  };

  public reset = () => {
    this.pause();
    this.setTimeId = null;
    this.elapsedTime = 0;
    this.timer!.textContent = '00:00';
  };

  public switchTimer = () => {
    if (this.setTimeId === null) {
      this.start();
    } else {
      this.pause();
    }
  };
}
