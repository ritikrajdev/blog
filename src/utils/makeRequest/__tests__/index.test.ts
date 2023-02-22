import axios from 'axios';
import { makeRequest } from '..';
import { GET_ALL_BLOGS } from '../../../constants/apiEndpoints/blog';
import { mockedBlogData } from '../../../constants/mockedData';

jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('makeRequest', () => {
  it('should make api call with correct request and return correct response data', async () => {
    mockedAxios.mockResolvedValue({ data: mockedBlogData });

    expect(mockedAxios).not.toBeCalled();
    const result = await makeRequest(GET_ALL_BLOGS);
    expect(mockedAxios).toBeCalledTimes(1);
    expect(mockedAxios).toBeCalledWith(GET_ALL_BLOGS);
    expect(result).toEqual(mockedBlogData);
  });
});
