using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Abstraction;

public class BaseCommandHandler
{
    protected AppDbContext _context;
    protected IMapper _mapper;

    public BaseCommandHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
}