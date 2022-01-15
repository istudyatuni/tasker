export function scriptSanitize(t){return t.replaceAll("<script","&lt;script&gt;").replaceAll("</script>","&lt;/script&gt;").replaceAll(/(<[^<>]+ )on([^<>]+>)/gi,"")}
