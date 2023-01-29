import { getLanguages } from "../controller/controller";
import { TableCell, TableRow } from "@mui/material";
import { Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ForkRightIcon from "@mui/icons-material/ForkRight";
export const DataGenerator = (repoOBJ, colorArray) => {
  const repoFormattedData = [];

  repoOBJ.forEach(async (repo) => {
    const {
      name,
      language,
      description,
      stargazers_count,
      forks_count,
      created_at,
      full_name,
    } = repo;
    let repoName = "";
    if (name) {
      repoName = name;
    }

    let repoLanguage = "";

    if (language) {
      repoLanguage = language;
    } else {
      const Lang = await getLanguages(full_name).then((lang) =>
        Object.keys(lang).join(", ")
      );
      repoLanguage = Lang || null;
    }
    let repoDescription = "";

    if (description) {
      repoDescription = description;
    }

    let starCount = 0;
    if (stargazers_count) {
      starCount = stargazers_count;
    }
    let forkCount = 0;
    if (forks_count) {
      forkCount = forks_count;
    }
    let dateCreated = new Date(Date.now());
    if (created_at) {
      dateCreated = created_at;
    }
    // const formattedCommitData = [];

    const repoInfo = {
      repoName,
      repoLanguage,
      repoDescription,
      starCount,
      forkCount,
      dateCreated,
      full_name,
      langColor:
        colorArray.find((col) => col.name === language)?.color || "#000000",
      // commitData: formattedCommitData,
    };
    repoFormattedData.push(repoInfo);
  });

  return repoFormattedData.sort(function (a, b) {
    return b.starCount - a.starCount;
  });
};
export const headerGenerator = (headers) => {
  return (
    <TableRow>
      {headers.map((head, i) => {
        return (
          <TableCell
            key={head}
            sx={
              i === 0
                ? {
                    fontWeight: "bold",
                  }
                : {
                    fontWeight: "bold",
                    align: "center",
                  }
            }
          >
            {head}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
export const rowGenerator = (data) => {
  return data.map((el, i) => {
    return (
      <TableRow key={el.Title}>
        {Object.keys(el).map((commit, i) => (
          <TableCell
            key={el[commit]}
            align={i === 0 ? "left" : "center"}
            scope="row"
          >
            {commit === "DateCreated"
              ? new Date(el[commit]).toLocaleString()
              : el[commit]}
          </TableCell>
        ))}
      </TableRow>
    );
  });
};
export const FrontDetails = (repoDetails) => [
  {
    icon: (
      <span
        className="dot"
        style={{
          height: "15px",
          width: "15px",
          backgroundColor: repoDetails.langColor,
          borderRadius: "50%",
          margin: "auto .5rem auto auto",
        }}
      />
    ),
    detail: <Typography size="small"> {repoDetails.repoLanguage}</Typography>,
  },
  {
    icon: (
      <StarBorderIcon
        className="star"
        style={{
          stroke: "yellow",
          color: "yellow",
          margin: "auto .2rem auto auto",
        }}
      />
    ),
    detail: <Typography size="small"> {repoDetails.starCount}</Typography>,
  },
  {
    icon: (
      <ForkRightIcon
        className="star"
        style={{
          margin: "auto .2rem auto auto",
        }}
      />
    ),
    detail: <Typography size="small"> {repoDetails.forkCount}</Typography>,
  },
  {
    icon: (
      <span
        // className="label"
        style={{
          // backgroundColor: langColor,
          fontWeight: "bold",
          margin: "auto .5rem auto auto",
        }}
      >
        DateCreated:
      </span>
    ),
    detail: (
      <Typography size="small">
        {" "}
        {new Date(repoDetails.dateCreated).toLocaleString()}
      </Typography>
    ),
  },
];