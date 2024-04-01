class UrlUtil {
  public static encodeURIParams(params: Map<string, string>, addQuestionMark: boolean): string {
    let init = '?';
    params.forEach((k, v) => {
      let pair = '';
      pair = pair + v + '=' + k + '&';
      init = init + pair;
    });
    return init;
  }
}
export default UrlUtil;
