# ncp-clova-csr-test

네이버 클라우드의 [CSR(Clova Speech Recognition) API](https://apidocs.ncloud.com/ko/ai-naver/clova_speech_recognition/)의 정확도를 간단하게 구해봅니다.

## 프로그램 작동

실행하기 전에 먼저 [NCP 콘솔](https://console.ncloud.com/mc/solution/naverService/application?version=v2)에서 [Application을 등록](http://docs.ncloud.com/ko/naveropenapi_v3/application.html)해야 합니다. 등록이 끝났으면 `/src/ncp/openapi/api/auth/authInfo.js`와 `/src/ncp/openapi/api/auth/secretKey.js`에 인증키와 비밀키를 넣어주셔야 합니다.

```
$ git clone https://github.com/3jins/ncp-clova-csr-test.git
$ npm install
$ npm run dev
```

## 결과 측정 방법

[Levenshtein 거리 알고리즘](https://www.npmjs.com/package/fast-levenshtein)을 사용합니다.

원문을 `O`, 원문의 길이를 `l`, 클로바에 의한 인식결과문을 `R`, Levenshtein 거리 함수를 `L`이라 할 때, 정확도는 다음과 같이 계산합니다. 별로 거창하지 않아요.

<p align="center"><img src="https://user-images.githubusercontent.com/25216837/61993404-7675c480-b0a6-11e9-8c84-daab8f227128.png" width="20%"/></p>

## 테스트 결과

### 1. 타짜

- 데이터 특징

    발음은 정확한 편이지만 비속어와 은어가 약간 섞여 있습니다.

- 원문

    > 싸늘하다 가슴에 비수가 날아와 꽂힌다 하지만 걱정하지 마라 손은 눈보다 빠르니까 아귀한텐 밑에서 한 장 정마담도 밑에서 한 장 나 한 장 아귀한텐 다시 밑에서 한 장 이제 정마담에게 마지막 한 장 동작 그만 밑장빼기냐 뭐야 내 패하고 정마담 패를 밑에서 뺐지 내가 빙다리 핫바지로 보이냐 이 새끼야 증거 있어 증거 증거 있지 너는 나한테 구땡을 줬을 것이여 그리고 정마담에게 주려는 거 이거 이거 이거 장짜리 아니여 자 모두들 보쇼 정마담한테 장땡을 줘서 이 판을 끝내겠다 이거 아니여 시나리오 쓰고 있네 미친 새끼가 으허허허허허허허 예림이 그 패 봐봐 혹시 장이야 패 건들지 마 손모가지 날아가붕게 해머 갖고 와 정말 이렇게까지 해야 돼 잠깐 그렇게 피를 봐야겠어
    
- 124kbps 파일 사용

    > 싸늘하다 가슴에 비수가 날아와 꽂힌다 하지만 걱정하지 마라 손은 눈보다 빠르니까 아귀한테 밑에서 한장 정마담도 밑에서 한장 나 한장 아귀한텐 다시 밑에서 한장 이제 정마담한테 마지막 한장 2101 뭐야 내 패하고 정마담 패를 밑에서 뺏지 내가 삥다리 핫바지로 보내시게 친구 있었지 그 증거 있지 너는 나한테 구땡을 줬을것이여 그리고 정마담한테 줄려는 거 이거 이거 이렇게 앉아야 유저 모두들 보조등만 가도 장대로 수입하는 끝내겠다 이거 아니 시나리오 쓰고 있네 미친 새끼가 하고 미국 시장에도 제가 손모가지 날
    > 라가 붕게해머같고와 정말 이렇게까지 해야되 잠깐 그렇게 피를 봐야겠어

    - 테스트 수행일: 2019-07-27
    - **정확도: 72.31%**

- 320kbps 파일 사용

    > 싸늘하다 가슴에 비수가 날아와 꽂힌다 하지만 걱정하지 마라 손은 눈보다 빠르니까 아귀한테 밑에서 한장 정마담도 밑에서 한장 나 한장 아귀한텐 다시 밑에서 한장 이제 정마담한테 마지막 한장의 밑장빼기냐 머야 내 패하고 정마담 패를 밑에서 뺏지 내가 삥다리 핫바지로 보내시게 친구 있었지 그 증거 있지 너는 나한테 구땡을 줬을것이여 그리고 정마담한테 줄려는 거 이거 이거 이렇게 앉아야 유저 모두를 보조할 때마다 도장등을 수입하는 끝내겠다 이거 아니 시나리오 쓰고 있네 미친 새끼가 하하 그게 바로 시장이 앞으로도 제가 손모가지 날라가 붕게해머같고와 정말 이렇게까지 해야되 잠깐 그렇게 피를 봐야겠어

    - 테스트 수행일: 2019-07-27
    - **정확도: 74.19%**

### 2. 해적

- 데이터 특징

    말이 빠르고, 입으로 내는 효과음이 많이 섞여 있습니다.

- 원문

    > 아니 진짜 촌구석에 있어서 뭘 모르나 본데요 바다는 말입니다 엄청나게 깊고 어마어마하게 넓으니까 아예 그냥 별 것들이 다 있는거요 에 심지어 대가리에 횃불이 있는 놈이 있어요 이 놈들 수천 마리가 마빡에서 불을 파악 키면은 바다가 순식간에 그냥 팍 날치라는 놈이 있어요 얘는 날개 달린 물고긴데 그 놈들 수만 마리가 물 속에서 촥 헤엄치다가 물 밖으로 탁 나오면서 그냥 날개를 촥 하면서 쉭 하면 저기서부터 그냥 수만 마리가 쉭 쉭 쉭 쉭 쉭 솩 장관이야 장관

- 124kbps 파일 사용

    > 안 있어 초고속 있어서 뭘 뭘 어떻게 입고 어떻게 널 닮은 건 50여 대가 얘는 왜 이렇게 바빠 계속 부를 거다 이 날개달린 마리가 물속에서 물밖으로 낡은 창

    - 테스트 수행일: 2019-07-27
    - **정확도: 21.79%**

- 320kbps  파일 사용

    > 안 있어 초고속 있어서 뭘 몰라요 진짜 성덕의 깊고 아프게 널 닮은 거요 50대가 얘는 왜 이렇게 바빠 계속 불을 달게 되는 부분은 말이가 물속에서 물밖으로 낡은 창

    - 테스트 수행일: 2019-07-27
    - **정확도: 20.62%**

### 3. 로스트

- 데이터 특징

    한국어 원어민도 알아듣기 쉽지 않습니다.

- 원문

    > 아 페이퍼 타올이 여기 있네 뭐라고요 자네의 장인이신 백 회장님 밑에서 일하고 있지 여태까지 날 미행한거야 물론 그리고 자네가 도망가려는 것도 알고 있지 자네는 계획대로 남은 시계를 캘리포니아에 있는 백 회장님 친구에게 전하라고 만약 그렇게 못하면 자네는 그녀를 잃게 되겠지 넌 자유의 몸이 아냐 여태까지 그래왔고 앞으로도 계속

- 124kbps 파일 사용

    > 다음 이야기는 뭐라고요 네 울지 않으니 실패와 회장님 밑에서 일한 거인지 아시나요 이거 진짜 내가 눈가리는것도 전에는 계획대로 남은 음식 이렇게 하면 손해인의장님 친구
    > 에게 전화가 만약 그렇게 못하면 현행 법률은 인기도 예전 몸이 아니야

    - 테스트 수행일: 2019-07-27
    - **정확도: 39.34%**

### 4. 기상예보

- 데이터 특징

    우리나라에서 가장 정확한 한국어 발음을 구사하시는 분들의 음성이 담겨 있습니다.

- 원문

    > 이번 장맛비는 특히 중부 지방을 중심으로 집중적으로 쏟아질 거라는 예보가 나와 있습니다 기상 센터 연결해서 자세한 전망 알아보겠습니다 배혜지 캐스터 방금 연결했던 대전 지역에 비가 시작이 됐던데 또 어느 어느 지역에 비가 내리고 있습니까 네 앞서 보신 것처럼 대전을 비롯한 중부 지방과 전북 영남 내륙 지역에 비가 내리고 있습니다 충남 북부 지역으로는 호우 경보가 발효 중인 가운데 시간당 40mm 안팎의 세찬 비가 쏟아지는 곳이 있구요 경기 남부와 그 밖에 충청 북부 지역으로도 호우주의보가 발효 중입니다 붉은색으로 보이는 이 비구름이 강하게 발달해서 현재 동쪽으로 이동하고 있습니다 이번 장맛비는 일요일까지 길게 이어질 것으로 보입니다 남부지방은 토요일에 비가 점차 그치기 시작하겠고 마른 장마가 이어졌던 중부지방은 일요일까지도 비가 계속되겠습니다
    
- 320kbps 파일 사용

    > 이번 장맛비는 특히 중부 지방을 중심으로 집중적으로 쏟아질 거란 예보가 나와 있습니다 기상센터 연결해서 자세한 전망 알아보겠습니다 회식했어 방금 연결했던 대전 지역에
    > 비가 시작이 됐던데 또 어느 지역에 비가 내리고 있습니까 네 앞서 보신것처럼 대전을 비롯한 중부 지방과 전북 영남 내륙지역에 비가 내리고 있습니다 충남 북부지역으로는 호
    > 우경보가 발효 중인 가운데 시간당 40밀리미터 안팎의 세찬 비가 쏟아지는 곳이 있구요 경기 남부와 그 밖의 충청 북부 지역으로도 호우주의보가 발효 중입니다 붉은색으로 보
    > 이는 비구름이 강하게 발달해서 현재 동쪽으로 이동하고 있습니다 이번 장맛비는 일요일까지 길게 이어질것으로 보입니다 남부지방은 토요일에 비가 점차 그치기 시작 하겠고
    > 마른 장마가 이어졌던 중부 지방은 일요일까지도 비가 계속 되겠습니다

    - 테스트 수행일: 2019-07-27
    - **정확도: 93.33%**
