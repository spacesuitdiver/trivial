const initialState = [
  {
    id: 0,
    name: 'Showroom',
    thumbnail: 'http://localhost:18080/static/videos/bmw.jpg',
    playlist: [
      {
        video: {
          thumbnail: 'https://source.unsplash.com/random/480x270',
          duration: '1:15:30',
        },
        title: 'Video 1',
        subTitle: 'Lorem ipsum dolor sit amet.',
      },
      {
        video: {
          thumbnail: 'https://source.unsplash.com/rahrmndom/481x270',
          duration: '30:00',
        },
        title: 'Video 2',
        subTitle: 'Lorem ipsum dolor sit amet.',
      },
      {
        video: {
          thumbnail: 'https://source.unsplash.com/random/482x270',
          duration: '20:13',
        },
        title: 'Video 3',
        subTitle: 'Lorem ipsum dolor sit amet.',
      },
    ],
  },
  {
    id: 1,
    name: 'Sales Office',
    thumbnail: 'http://localhost:18080/static/videos/gap.jpg',
    playlist: [
      {
        video: {
          thumbnail: 'https://source.unsplash.com/random/483x270',
          duration: '1:15:30',
        },
        title: 'Video 1',
        subTitle: 'Lorem ipsum dolor sit amet.',
      },
      {
        video: {
          thumbnail: 'https://source.unsplash.com/random/484x270',
          duration: '30:00',
        },
        title: 'Video 2',
        subTitle: 'Lorem ipsum dolor sit amet.',
      },
      {
        video: {
          thumbnail: 'https://source.unsplash.com/random/485x270',
          duration: '20:13',
        },
        title: 'Video 3',
        subTitle: 'Lorem ipsum dolor sit amet.',
      },
    ],
  },
  {
    id: 2,
    name: 'Service',
    thumbnail: 'http://localhost:18080/static/videos/weathertech.jpg',
    playlist: [
      {
        video: {
          thumbnail: 'https://source.unsplash.com/random/486x270',
          duration: '1:15:30',
        },
        title: 'Video 1',
        subTitle: 'Lorem ipsum dolor sit amet.',
      },
      {
        video: {
          thumbnail: 'https://source.unsplash.com/random/487x270',
          duration: '30:00',
        },
        title: 'Video 2',
        subTitle: 'Lorem ipsum dolor sit amet.',
      },
      {
        video: {
          thumbnail: 'https://source.unsplash.com/random/488x270',
          duration: '20:13',
        },
        title: 'Video 3',
        subTitle: 'Lorem ipsum dolor sit amet.',
      },
    ],
  },
];

export default (state = initialState, { type }) => {
  switch (type) {
    default: {
      return initialState;
    }
  }
}