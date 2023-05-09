using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Exceptions;

public class RecordAlreadyExistException : Exception
{
    public RecordAlreadyExistException() : base()
    {
    }

    public RecordAlreadyExistException(string? message) : base(message)
    {
    }

    public RecordAlreadyExistException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}
