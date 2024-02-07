export const DebugWindow = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>DebugWindow</h1>
    </section>
  );
};

export default DebugWindow;

//------DONT NEED-------------------------------------------
export const ColorsComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const colorElements = useMemo(() => {
    const Elements = [];
    for (const colorCategory in colors) {
      const colorShade = colors[colorCategory];

      for (const shade in colorShade) {
        const colorValue = colorShade[shade];
        Elements.push(
          <Box key={`${colorCategory}-${shade}`}>
            <Box
              style={{
                background: `${colorValue}`,
                width: "10rem",
                height: "2rem",
              }}
            ></Box>
            <p>{`${colorCategory} - ${shade}: ${colorValue}`}</p>
          </Box>
        );
      }
    }
    return Elements;
  }, [colors]);

  const firstHalf = colorElements.slice(0, Math.ceil(colorElements.length / 2));
  const secondHalf = colorElements.slice(Math.ceil(colorElements.length / 2));
  return (
    <Box>
      <Typography variant="h4">
        {`import {useTheme} from '@mui/material'`}{" "}
      </Typography>
      <Typography variant="h4">{`import {tokens} from '../theme' `}</Typography>
      <Typography variant="h4">{`const theme = useTheme()`}</Typography>
      <Typography variant="h4">
        {`const colors = tokens(theme.palette.mode)`}{" "}
      </Typography>
      <Box display="flex" gap={10}>
        <div>{firstHalf}</div>
        <div>{secondHalf}</div>
      </Box>
    </Box>
  );
};
