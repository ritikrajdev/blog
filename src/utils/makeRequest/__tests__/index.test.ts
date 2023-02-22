import axios from 'axios';
import { makeRequest } from '..';
import { GET_ALL_BLOGS, PUT_BLOG } from '../../../constants/apiEndpoints/blog';
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

  it('should make api call without response data & return correct reponse data', async () => {
    const objClaps1 = { claps: 1 };

    mockedAxios.mockResolvedValue({ data: { data: objClaps1 } });

    expect(mockedAxios).not.toBeCalled();
    const result = await makeRequest(PUT_BLOG(1), { data: objClaps1 });
    expect(result).toEqual({ data: objClaps1 });
    expect(mockedAxios).toBeCalledTimes(1);
    expect(mockedAxios).toBeCalledWith({ ...PUT_BLOG(1), data: objClaps1 });
  });
});
