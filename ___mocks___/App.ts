
import App from '../App';

const mock: jest.Mocked<App> = {
  methods: ['testMethod'],

  event: {
    on: jest.fn(),
    off: jest.fn()
  },

  call: jest.fn()
};

export default mock;