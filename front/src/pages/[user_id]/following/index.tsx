import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import AppFooter from "src/components/layout/footers/AppFooter";
import AppTemplate from "src/components/layout/templates/AppTemplate";
import { useUserFollowingCountQuery, useUserFollowingsQuery } from "src/query/user/following";

// module
import cn from "classnames";

// utils
import paginationUtil from "src/utils/pagination-util";
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Search } from "@mui/icons-material";
import { useAppSelector } from "src/store";

export default function FollowingPage() {
  // redux
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  // get user_id from url
  const { user_id: url_user_id } = useParams<{ user_id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");

  const { isLoading: isFollowingCountLoading, data: followingCountData } = useUserFollowingCountQuery(url_user_id); // 팔로우 전체 목록
  const { isLoading: isFollowingsLoading, data: followingsData } = useUserFollowingsQuery(url_user_id, pageParam ?? "1"); // 쿼리 스트링이 없으면 1 보낸다.

  const onFollow = () => {};
  const onUnFollow = () => {};

  const onClickPageIcon = (type: 1 | 2 | 3 | 4) => () => {
    if (followingCountData === undefined) return null;

    switch (type) {
      case 1:
        setSearchParams({ page: "1" });
        break;
      case 2:
        if (pageParam !== null && Number(pageParam) > 1) {
          setSearchParams({ page: String(Number(pageParam) - 1) });
        }
        break;
      case 3:
        if (Number(pageParam) < Math.ceil(followingCountData / 10)) {
          setSearchParams({ page: String(Number(pageParam ?? 1) + 1) });
        }
        break;
      case 4:
        if (followingCountData !== 0) {
          setSearchParams({ page: String(Math.ceil(followingCountData / 10)) });
        }
        break;
    }
  };

  return (
    <AppTemplate>
      <div className="w-full h-full">
        <div className="max-w-4xl mx-auto mt-6 px-4">
          <article className="bg-white shadow-md rounded-md mb-2">
            <header className="choco-border-b p-4">
              <h1 className="text-xl text-black">
                <span className="font-semibold">{url_user_id}</span> 님의 팔로우 목록
              </h1>
            </header>
            <nav className="flex">
              <div>
                <Link to="../followee" relative="path">
                  <button className="snack-btn py-2">팔로워</button>
                </Link>
              </div>
              <div>
                <Link to="">
                  <button className="snack-btn py-2 bg-snack-sky">팔로우</button>
                </Link>
              </div>
            </nav>
            <nav className="flex justify-between choco-border-b p-4">
              <div>
                <select id="countries" className="choco-input">
                  <option value="US">최신순</option>
                  <option value="CA">오름차순</option>
                  <option value="FR">내림차순</option>
                </select>
              </div>
              <div className="">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <input type="text" id="simple-search" className="choco-input pl-10" placeholder="Search" required />
                </div>
              </div>
            </nav>
            <main>
              <div className="p-4">
                {isFollowingsLoading ? (
                  <div> skeleton </div>
                ) : (
                  followingsData?.map((v, i) => (
                    <div className="flex w-full justify-between border-b border-solid border-gray-300 pb-2 mb-4" key={v.id}>
                      <div className="flex ">
                        <div>
                          <Link to={`/${v.user_id}`}>
                            <div className="rounded-full w-16 h-16 bg-gray-300"></div>
                          </Link>
                        </div>
                        <div className="ml-2">
                          <p>
                            <Link to={`/${v.user_id}`}>{v.name}</Link>
                          </p>
                          <p>{v.introduction ?? "-"}</p>
                        </div>
                      </div>
                      <div>{id ? <button className="snack-btn">언팔로우</button> : <button className="snack-btn">팔로우</button>}</div>
                    </div>
                  ))
                )}
              </div>
            </main>
          </article>
          {isFollowingCountLoading ? (
            <div> skeleton </div>
          ) : (
            <article className="bg-white shadow-md rounded-md  w-full flex justify-center p-4">
              <ul className="flex  p-2">
                <li className="mx-0.5">
                  <button className="w-8 h-8" onClick={onClickPageIcon(1)}>
                    <KeyboardDoubleArrowLeft />
                  </button>
                </li>
                <li className="mx-0.5">
                  <button className="w-8 h-8" onClick={onClickPageIcon(2)}>
                    <KeyboardArrowLeft />
                  </button>
                </li>
                {paginationUtil(followingCountData ?? 0, pageParam === null ? 1 : Number(pageParam), 5).map((v, i) => (
                  <Link key={v} to={`?page=${v}`}>
                    <li className="mx-0.5">
                      <button
                        className={cn(
                          "w-8 h-8 rounded-md hover:bg-gray-100 ",
                          v === Number(pageParam) && "border border-solid border-snack-sky text-snack-sky",
                          v === 1 && pageParam === null && "border border-solid border-snack-sky text-snack-sky",
                        )}
                      >
                        {v}
                      </button>
                    </li>
                  </Link>
                ))}

                <li className="mx-0.5">
                  <button className="w-8 h-8" onClick={onClickPageIcon(3)}>
                    <KeyboardArrowRight />
                  </button>
                </li>
                <li className="mx-0.5">
                  <button className="w-8 h-8" onClick={onClickPageIcon(4)}>
                    <KeyboardDoubleArrowRight />
                  </button>
                </li>
              </ul>
            </article>
          )}
        </div>
      </div>
      <AppFooter />
    </AppTemplate>
  );
}
