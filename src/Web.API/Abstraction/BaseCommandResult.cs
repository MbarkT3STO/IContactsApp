using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Interfaces;

namespace Web.API.Abstraction;

public class BaseCommandResult<TResult> : ICommandResult<TResult>
{
    public TResult? Value { get; }

    public bool IsSucceeded { get; } = true;
    public bool HasValue => Value != null;
    public bool IsFailed => !IsSucceeded;
    public bool HasException => Exception != null;

    public Exception? Exception { get; }
    public string? ErrorMessage { get; }


    public BaseCommandResult(TResult? value)
    {
        Value = value;
    }

    public BaseCommandResult(TResult? value, bool isSucceeded = true, Exception? exception = null, string? errorMessage = null)
    {
        Value = value;
        IsSucceeded = isSucceeded;
        Exception = exception;
        ErrorMessage = errorMessage;
    }

    public BaseCommandResult(Exception? exception, string? errorMessage)
    {
        IsSucceeded = false;
        Exception = exception;
        ErrorMessage = errorMessage;
    }

    public BaseCommandResult(Exception? exception)
    {
        IsSucceeded = false;
        Exception = exception;
    }
}