import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const Create: NextPage = () => {
  const router = useRouter();
  const { bname } = router.query;

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const doCreateArticle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: do something with title and content
  };

  return (
    <>
      <div className="wrapper">
        <div>{bname}</div>
        <h1>새 글 쓰기</h1>
        <form onSubmit={doCreateArticle}>
          <label htmlFor="title">
            <h2>제목</h2>
          </label>
          <input
            id="title"
            name="title"
            className="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label htmlFor="content">
            <h2>내용</h2>
          </label>
          <textarea
            id="content"
            name="content"
            className="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
          <button type="submit" className="submit">
            작성
          </button>
        </form>
      </div>

      <style jsx>{`
        .wrapper {
          max-width: 1000px;
          margin: 50px auto;
          padding: 0 40px;
        }

        .title {
          display: block;
          width: 100%;
          margin: 20px 0;
          border-radius: 5px;
          border: 1px solid #dddddd;
          padding: 5px;
        }
        .content {
          display: block;
          width: 100%;
          margin: 20px 0;
          border-radius: 5px;
          border: 1px solid #dddddd;
          resize: vertical;
          min-height: 200px;
          padding: 5px;
        }
        .submit {
          border-radius: 5px;
          border: 1px solid #dddddd;
          padding: 5px 20px;
          float: right;
          clear: both;
        }
      `}</style>
    </>
  );
};

export default Create;
