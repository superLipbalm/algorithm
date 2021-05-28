## 문제

> 출처: 프로그래머스 코딩테스트 연습, 프린터
> https://programmers.co.kr/learn/courses/30/lessons/42587

### 문제 설명

일반적인 프린터는 인쇄 요청이 들어온 순서대로 인쇄합니다. 그렇기 때문에 중요한 문서가 나중에 인쇄될 수 있습니다. 이런 문제를 보완하기 위해 중요도가 높은 문서를 먼저 인쇄하는 프린터를 개발했습니다. 이 새롭게 개발한 프린터는 아래와 같은 방식으로 인쇄 작업을 수행합니다.

> 1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
> 2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.
> 3. 그렇지 않으면 J를 인쇄합니다.
>    예를 들어, 4개의 문서(A, B, C, D)가 순서대로 인쇄 대기목록에 있고 중요도가 2 1 3 2 라면 C D A B 순으로 인쇄하게 됩니다.

내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 알고 싶습니다. 위의 예에서 C는 1번째로, A는 3번째로 인쇄됩니다.

현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities와 내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location이 매개변수로 주어질 때, 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 return 하도록 solution 함수를 작성해주세요.

### 제한사항

- 현재 대기목록에는 1개 이상 100개 이하의 문서가 있습니다.
- 인쇄 작업의 중요도는 1~9로 표현하며 숫자가 클수록 중요하다는 뜻입니다.
- location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며 대기목록의 가장 앞에 있으면 0, 두 번째에 있으면 1로 표현합니다.

### 입출력 예

| priorities         | location | return |
| ------------------ | -------- | ------ |
| [2, 1, 3, 2]       | 2        | 1      |
| [1, 1, 9, 1, 1, 1] | 0        | 5      |

#### 입출력 예 설명

예제 #1

문제에 나온 예와 같습니다.

예제 #2

6개의 문서(A, B, C, D, E, F)가 인쇄 대기목록에 있고 중요도가 1 1 9 1 1 1 이므로 C D E F A B 순으로 인쇄합니다.

---

## 코드

### work 변수를 선언

```
function solution(priorities, location) {
    var answer = 0;
    let works = priorities.map((prioritie, index)=>[index, prioritie]);
    let work = [];

    while(true){
        work = works[0];
        if(works.filter(el=>el[1] > work[1]).length){
            works.push(work);
            works.shift();
        } else {
            works.shift();
            answer+=1;
            if(work[0] === location) break;
        }

    }

    return answer;
}
```

### works에서 바로 참조

```
function solution(priorities, location) {
    var answer = 0;
    let works = priorities.map((prioritie, index)=>[index, prioritie]);

    while(true){
        if(works.filter(el=>el[1] > works[0][1]).length){
            works.push(works[0]);
            works.shift();
        } else {
            answer+=1;
            if(works[0][0] === location) break;
            works.shift();
        }

    }

    return answer;
}
```

---

## 풀이

- 프린트 작업 대기열은 큐 구조를 가지고 있다.
- 각 작업의 인덱스와 우선순위를 [index, priorities] 와 같은 구조의 배열에 담아 works 라는 새 배열을 만든다.
- 배열의 맨 앞 작업보다 우선순위가 높은 작업이 있는지 검사한다. filter 메서드를 이용해 검사함.
  - 우선순위가 높은 작업이 발견되어도 끝까지 모두 순회하기 때문에 반복문으로 검사하고 찾으면 중단하도록 해 성능을 개선 할 수 있을 것 같다.
- 우선순위가 더 높은 작업이 있다면 works큐의 맨 뒤로 옮겨줌
- 아니라면 큐에서 제거하고 answer에 1을 더해줌(출력횟수 카운트)
- 만약 제거한 작업의 인덱스가 location과 같다면 while문을 탈출해 answer를 반환한다.

## work 변수 선언 여부에 따른 차이

- work 변수를 선언해 현재 맨 앞에 있는 작업을 저장하고 조건문에서 work변수를 참조해서 쓰면 가독성이 높아짐
  - 하지만 참조하는 횟수가 1회 늘어나고 할당하는 작업이 추가되어 성능이 떨어짐 (n => 2n 이 되므로)
