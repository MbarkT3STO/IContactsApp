using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Interfaces;

public interface ICommandResult<TResult>
{
    TResult? Value { get; }
    bool HasValue => Value != null;

    bool IsSucceeded { get; }
    bool IsFailed => !IsSucceeded;

    Exception? Exception { get; }
    bool HasException => Exception != null;
    string? ErrorMessage { get; }
}
