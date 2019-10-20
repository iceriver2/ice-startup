package com.ssm.web.filter;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.annotation.*;

@WebFilter(filterName = "NothingFilter", urlPatterns = "/*")
public class NothingFilter implements Filter {
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        filterChain.doFilter(servletRequest, servletResponse);
    }
    public void destroy() {
    }
}
