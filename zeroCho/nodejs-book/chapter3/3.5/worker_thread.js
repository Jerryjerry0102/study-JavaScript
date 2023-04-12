const {
  isMainThread,
  Worker,
  parentPort,
  workerData,
} = require("worker_threads");

// 처음에 메인 스레드가 실행되서
// 메인 스레드 안에서 워크 스레드들을 생성하고 일을 분배하고
// 워커 스레드들이 일을 마치면 다시 메인 스레드로 보내서
// 메인 스레드에서 워커 스레들의 일들을 합쳐서
// 최종적인 결과물로 리턴하는 방식을 갖고 있다.

if (isMainThread) {
  // 메인 스레드
  const threads = new Set();
  threads.add(
    // Worker을 만들고 나중에 postMessage 할 수도 있지만
    // 초기 데이터가 있다면 처음부터 두 번째 인자에 설정
    new Worker(__filename, {
      workerData: { start: 1 },
    })
  );
  threads.add(
    new Worker(__filename, {
      workerData: { start: 2 },
    })
  );
  for (let worker of threads) {
    worker.on("message", (value) => console.log("워커 스레드로부터:", value));
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log("워커 끝!");
      }
    });
  }
} else {
  // 워커 스레드
  // 초기 데이터
  const data = workerData;
  parentPort.postMessage(data.start + 100);
}

/*
if (isMainThread) {
  // 메인 스레드
  const worker = new Worker(__filename);
  worker.on("message", (value) => console.log("워커 스레드로부터:", value));
  worker.on("exit", () => console.log("워커 끝!"));
  worker.postMessage("ping");
} else {
  // 워커 스레드
  parentPort.on("message", (value) => {
    console.log("부모(메인 스레드)로부터:", value);
    parentPort.postMessage("pong");
    parentPort.close(); // 워커 스레드 종료
  });
}
*/
