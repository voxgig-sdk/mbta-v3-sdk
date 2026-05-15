package core

type MbtaV3Error struct {
	IsMbtaV3Error bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMbtaV3Error(code string, msg string, ctx *Context) *MbtaV3Error {
	return &MbtaV3Error{
		IsMbtaV3Error: true,
		Sdk:              "MbtaV3",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MbtaV3Error) Error() string {
	return e.Msg
}
