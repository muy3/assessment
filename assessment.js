(function()
{
    'use strict';

    // HTML要素を取得
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    // 診断データ
    const answers = 
    [
        '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    ];

    /**
     * 文字列を渡すと文字列の文字コードの総和を返す
     * @param {string} char 文字列
     * ＠return {number} 文字コードの総和
     */
    function sumOfcharCode(char)
    {
        let result = 0;
        for (let i = 0; i < char.length; i++)
        {
            result = result + char.charCodeAt(i);
        }
        return result;
    }

    /**
     * 名前の文字列を渡すと診断結果を返す
     * @param {string} userName ユーザーの名前
     * ＠return {string} 診断結果
     */
    function assessment(userName)
    {
        // 入力された名前の文字コード番号を一文字ずつ取得して足し合わせる
        const userNameCode = sumOfcharCode(userName);
        
        // 文字コード番号の合計を診断結果の数で割って余りを求め、それを利用してどの診断結果を出力するか決める
        const index = userNameCode % answers.length;
        let result = answers[index];

        // 診断データの {userName} をユーザーの名前に置き換える
        result = result.replace(/\{userName\}/g, userName)

        return result;
    }

    /**
     * 指定した要素の子どもを全て削除する
     * @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element)
    {
        while (element.firstChild)
        {
            element.removeChild(element.firstChild);
        }
    }

    function onclick()
    {
        // 入力欄からユーザーの名前を取得
        const userName = userNameInput.value;

        // ユーザーの名前が入力されていない場合、診断しない
        if (userName.length === 0)
        {
            return;
        }
        
        // 診断結果エリアとツイートエリアをリセット
        removeAllChildren(resultDivided);
        removeAllChildren(tweetDivided);

        // 診断結果エリアの見出しを作成
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        // 診断結果エリアの本文を作成
        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        // ツイートエリアを作成
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('あなたのいいところ')
            + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = '#あなたのいいところ　をツイートする';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    }

    // Enterキーが押されたら診断結果を表示する
    userNameInput.onkeydown = (event) =>
    {
        if (event.keyCode === 13)
        {
            onclick();
        }
    };

    // 診断ボタンが押されたら診断結果を表示する
    assessmentButton.onclick = () =>
    {
        onclick();
    };

    // テストコード
    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に書き換える処理が正しくありません。'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '同じ名前を入力すると同じ診断結果を出力する処理が正しくありません。'
    );
})();
