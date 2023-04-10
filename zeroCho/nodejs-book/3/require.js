console.log("require가 가장 위에 오지 않아도 된다.");
// 하지만 import는 가장 위에 있어야 한다.(최신 문법)

// 다른 파일을 실행만 하고 거기 있는 변수를 가져오고 싶지 않을 때
require("./var");

console.log(require);
// 해서 나오는 것들 중 cashe와 main 정도만 알아두면 된다.

/* main */
// require.main은 노드 실행 시 첫 모듈을 가리킴
// require.main으로 어떤 파일을 실행한 건지 알아낼 수 있다.

/* cashe */
// 읽은 정보를 cashe 안에 저장해 둠.
// 처음 require은 정말 그 파일을 읽어서 불러오지만
// 그 다음 불러올 때는 실제 파일이 아닌 cashe에 저장된 값을 불러온다.
// 효율적
