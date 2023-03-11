using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Web.API.Data;

namespace Web.API.Abstraction;

public abstract class BaseQueryHandler
{
    protected AppDbContext _context;
    protected IMapper _mapper;

    protected BaseQueryHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
}
