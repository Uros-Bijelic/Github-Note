'use client';

import ReactHeatMap, { type HeatMapProps } from '@uiw/react-heat-map';

interface IPostsHeatMapProps extends HeatMapProps {}

const PostsHeatMap: React.FC<IPostsHeatMapProps> = ({ value }) => {
  const todayDate = new Date();

  const sixMonthsAgo = todayDate.setMonth(todayDate.getMonth() - 6);
  const sixMonthsAgoDate = new Date(sixMonthsAgo);

  return (
    <ReactHeatMap
      value={value}
      weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
      startDate={sixMonthsAgoDate}
      width="100%"
      style={{ color: '#ffffff' }}
      panelColors={{
        0: '#1D232A',
        2: '#0E4429',
        4: '#006D32',
        10: '#26A641',
        20: '#39D353',
      }}
    />
  );
};

export default PostsHeatMap;
